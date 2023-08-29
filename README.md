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
const mercadolivreStrategy = require("passport-mercadolivre").Strategy

passport.use(
  new mercadolivreStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "http://www.example.com/auth/mercadolivre/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // + store/retrieve user from database, together with access token and refresh token
      return done(null, profile)
    }
  )
)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})
```

## Usage

Use `passport.authorize()`, specifying the `'mercadolivre'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get("/auth/mercadolivre", passport.authorize("mercadolivre"))

app.get(
  "/auth/mercadolivre/callback",
  passport.authorize("mercadolivre", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/")
  }
)

app.get("/", ensureAuthenticated, function (req, res) {
  res.send("Logged in user: " + req.user.nickname)
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/auth/mercadolivre")
}
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

## Thanks

Thanks to https://github.com/mjpearson/passport-wordpress for the README and file structure.
Thanks to https://github.com/sdurandeu/passport-mercadolibre for the MLA structure that I forked to inspire creating this one to MLB
