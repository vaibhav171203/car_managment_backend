const Car = require("../models/Car");

// Create a new car with images uploaded to Cloudinary
exports.createCar = async (req, res) => {
  try {
    const { title, description, tags, car_type, company, dealer } = req.body;
    const images = req.files ? req.files.map((file) => file.path) : []; // URLs from Cloudinary

    const car = new Car({
      title,
      description,
      tags: tags.split(",").map(tag => tag.trim()), // Split tags by comma and trim
      car_type,
      company,
      dealer,
      images,
      user: req.user.id,
    });

    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while creating car" });
  }
};

// Get all cars for the logged-in user
exports.getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching cars" });
  }
};

// Get a single car by its ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ error: "Car not found" });

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to view this car" });
    }

    res.status(200).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching car details" });
  }
};

// Update a car's details and images
exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags, car_type, company, dealer } = req.body;

    let car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to update this car" });
    }

    const images = req.files ? req.files.map((file) => file.path) : car.images;

    // Update fields
    car.title = title || car.title;
    car.description = description || car.description;
    car.tags = tags ? tags.split(",").map(tag => tag.trim()) : car.tags;
    car.car_type = car_type || car.car_type;
    car.company = company || car.company;
    car.dealer = dealer || car.dealer;
    car.images = images;

    car = await car.save();
    res.status(200).json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while updating car" });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ error: "Car not found" });

    if (car.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete this car" });
    }

    await car.remove();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while deleting car" });
  }
};

// Search for cars by title, description, or tags
exports.searchCars = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "No search query provided" });

    const cars = await Car.find({
      $or: [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { tags: { $regex: q, $options: "i" } },
      ],
    }).where("user").equals(req.user.id); // restrict to the logged-in user's cars

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during search" });
  }
};
