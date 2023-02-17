# What's this?

This is the frontend piece of the assignment; it includes a [rudimementary UI](https://www.skeleton.dev/). (Bulma was also briefly considered) as well as logic to make sense of what the server component sends over from a local port. 
I felt the assignment was a bit ambiguous on purpose so I've imagined a basic UI to be a sort of readout of a user's purchases - like a profile. 


Hopefully, not too off the mark on that one. It's a pretty basic React app that calls its counterpart to fill in the data. The buttons on the left are pointless, just came with the template - heads up.


The logic for determining the rewards points sounded like the priority here so that part is rock solid. Sidenote: In terms of awards points logic instead of an if/else take on this, I mulled over subtracting 100 from a number as it would reveal the leftover number that awards 2x points (plus automatic 50) but ultimately decided against it because it wouldn't be (in my opinion) eminently obvious what's happening with the calculation.

# Now what?

`npm i && npm start` will fire up this app. Keep in mind the server needs to be running as well since it feeds the data as per requirements.