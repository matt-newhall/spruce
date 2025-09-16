# Matt Newhall: Tic-Tac-Toe Test

I have attempted all 3 questions in the brief, taking around 3-4 hours on-and-off. I have included a [Solution Limitations](Solution_Limitations.md) file where I examine what I would have done further with more time.

I have tried to do this task in a way I would do any day-to-day engineering - I have made separate pull requests for each question, viewable here ([1](https://github.com/matt-newhall/spruce/pull/1), [2](https://github.com/matt-newhall/spruce/pull/2) and [3](https://github.com/matt-newhall/spruce/pull/3)). I would advise checking these out, I've added some screenshots, a description of each solution, as well as some comments to clarify a number of a design/coding decisions taken in the project!

## Start Guide

### Install Dependencies

```bash
cd client
npm install
npm start
```

### Database Setup

Ensure that you have PostgreSQL installed - e.g. for Mac:

```bash
brew install postgresql
brew services start postgresql
```

Start PostgreSQL, and then run the following (use username as needed):

```bash
createuser -s matt-newhall
createdb -O matt-newhall tic_tac_toe_spruce
```

Verify that you can now connect to the database via:

```bash
psql -h localhost -U matt-newhall -d tic_tac_toe_spruce
```

### Server Setup

All database tables will be created on server start

```bash
cd server
npm install
npm start
```

## Testing

Jest is installed as the primary test runner for both the server and client. Run the following in either folder to launch the test runner:

```bash
npm test
```
