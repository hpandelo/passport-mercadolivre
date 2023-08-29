# Passport-MercadoLivre

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating with [mercadolivre](http://www.mercadolivre.com) using the OAuth 2.0 API.

Learn more about mercadolivre OAuth schema [here](http://developers.mercadolivre.com/server-side/).

## Installation

    $ npm install passport-mercadolivre

## Configuration

The MercadoLivre authentication strategy authenticates users using a MercadoLivre
account and OAuth 2.0 tokens. The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

You can obtain the client ID and secret by creating a mercadolivre app [here](http://applications.mercadolivre.com.ar/list).

```javascript
import { MercadoLivreStrategy, type MercadoLivreVerifyFunction } from 'passport-mercadolivre'

passport.use(
  new mercadolivreStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://www.example.com/auth/mercadolivre/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // + store/retrieve user from database, together with access token and refresh token

      // the callback function (done) will inject the profile in req.user
      return done(null, profile)

      // TIP: If you need the accessToken, you can use like this:
      // return done(null, { profile, accessToken })
      // In this case, the accessToken will be in req.user.accessToken and the data in req.user.profile
    }
  )
)

// The value passed to `done` here is stored on the session.
// We save the full user object in the session.
passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user))
})

// The value returned from `serializeUser` is passed in from the session here,
// to get the user. We save the full user object in the session.
passport.deserializeUser((user: string, done) => {
  done(null, JSON.parse(user))
})
```

## Usage

Use `passport.authorize()`, specifying the `'mercadolivre'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
// Use passport.authorize auth method
app.get("/auth/mercadolivre", passport.authorize("mercadolivre"))

// Use passport.authenticate on Callback
app.get(
  "/auth/mercadolivre/callback",
  passport.authenticate('mercadolivre', { session: true }),
  (req, res) => {
    // Successful authentication, redirect home or do what do you need
    res.redirect("/")
  }
)

// req.isAuthenticated() returns true if the request is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/auth/mercadolivre")
}

// User data is available at req.user object
app.get("/", ensureAuthenticated, (req, res) => {
  res.send("Logged in user: " + req.user.nickname)
})
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

## Thanks

Thanks to https://github.com/mjpearson/passport-wordpress for the README and file structure.
Thanks to https://github.com/sdurandeu/passport-mercadolibre for the MLA structure that I forked to inspire creating this one to MLB
