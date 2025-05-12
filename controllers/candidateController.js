const Candidate = require('./../models/candidateModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');

const getImageFromDB = async () => {
  const candidates = await Candidate.find({});
  const images = candidates
    .map(candidate => ({ id: candidate._id, photo: candidate.photo }))
    .filter(candidate => candidate.photo); // Keep id and photo
  return images;
};

const random_image = async () => {
  const images = await getImageFromDB();

  if (images.length < 2) {
    throw new AppError('Not enough images in the database!', 500);
  }

  const first_image_index = Math.floor(Math.random() * images.length);
  let second_image_index = Math.floor(Math.random() * images.length);

  while (first_image_index === second_image_index) {
    second_image_index = Math.floor(Math.random() * images.length);
  }

  return [images[first_image_index], images[second_image_index]];
};

// POST /Candidate
exports.page = async (req, res, next) => {
  const [image1, image2] = await random_image();

  console.log('Image 1:', image1);
  console.log('Image 2:', image2);

  res.status(200).render('overview', { image1, image2 });
};

const mongoose = require('mongoose');

exports.chosed = async (req, res, next) => {
  const { chosed, candidateId } = req.body;

  if (!candidateId) {
    return next(new AppError('Candidate ID is required.', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(candidateId)) {
    return next(new AppError('Invalid Candidate ID.', 400));
  }

  console.log('req.user:', req.user);
  if (!req.user || !req.user._id) {
    return res.status(401).render('login', {
      alert: 'You must be logged in to perform this action. Please sign in.'
    });
  }

  if (chosed === 'button1' || chosed === 'button2') {
    try {
      // Check if the candidate exists
      const candidate = await Candidate.findById(candidateId);
      if (!candidate) {
        return next(new AppError('Candidate not found.', 404));
      }

      // Update the candidate's data
      await Candidate.findByIdAndUpdate(candidateId, {
        $inc: { chosed: 1 }
      });

      // Update the user's clickedCandidates field with the candidate's name
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { clickedCandidates: candidate.id } // Store only the name
      });

      const [image1, image2] = await random_image();
      res.status(200).render('overview', { image1, image2 });
    } catch (err) {
      console.error('Database update error:', err);
      return next(new AppError('Database update failed.', 500));
    }
  } else {
    return next(new AppError('Invalid button choice.', 400));
  }
};

exports.loginpage = (req, res) => {
  res.status(200).render('login');
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updateUser
  });
});
