import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', (req, res, next) => {
  req.logOut(function (error) {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

export default router;
