# IFit® Debug

This NodeJS app connects to IFit® treadmills and logs the data received from them.

**Disclaimer:** I'm not associated with IFit®. Their trademarks and content are their own.

## How This Works

This software connects to your IFit® treadmill over Wi-Fi to observe its speed and incline. It then logs
the data received from it, for debugging purposes.

## Minimum Requirements

1. A Wi-Fi connected IFit® treadmill
2. A separate laptop or desktop running this software (tested on Mac and Raspbian, your mileage may vary on other OSs). I highly recommend running this on a Raspberry Pi (link below).
3. Know the IP address of your treadmill. (I recommend reserving this IP in your router so it doesn't change.)
4. You need to be minimally comfortable with a command line / terminal. Or have a nerdy friend!

https://www.amazon.com/CanaKit-Raspberry-Premium-Clear-Supply/dp/B07BC7BMHY/ref=sr_1_2_sspa?s=pc&ie=UTF8&qid=1543965340&sr=1-2-spons&keywords=raspberry+pi+3+b%2B&psc=1

## Software Requirements

Before you can run this code, you'll need to install a couple different things:

1. NodeJS. If you're running on Windows or OS X, get version 8: https://nodejs.org/dist/latest-v8.x/. If you're running this on a Raspberry Pi, get the latest LTS version of NodeJS. I'm presently running `v10.14.1`: https://nodejs.org/en/download/
2. Git https://git-scm.com/downloads

## Running On a Raspberry Pi

This software works great on a Raspberry Pi 3b+. Follow all of these steps on your Pi itself, not on
your laptop or desktop! The easiest way to do this is to plug a monitor, keyboard and mouse in to your
Pi. Or, if you've set it up, you can `ssh` in to your Pi and follow these steps as well.

## Getting Started

With the software requirements out of the way, you can run the following commands to get this program, set it up, and run it:

```bash
git clone https://github.com/dawsontoth/ifit-debug.git
cd ifit-debug
npm install
node app.js
```

The last command will guide you through connecting to your treadmill, then it will log speed and incline as
you control them on your treadmill.

## Contributing

Pull requests are welcome! Do your best to emulate the code around what you are editing.

## Thank you!

If this works for you and improves your running experience, please consider donating to the developer
who made this possible.

https://venmo.com/DawsonToth

This will also encourage future improvements. Thanks!
