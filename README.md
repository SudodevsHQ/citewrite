<h1 align="center">
  <br>
  <a href="#"><img src="https://cdn.discordapp.com/attachments/540056822435020805/630182294023569438/chrome_N6QLTas2cP.png" alt="CiteWrite"></a>
  <br>
  Citations on the go.
  <br>
</h1>

<h4 align="center">A minimal Text Editor desktop app built on top of <a href="http://electron.atom.io" target="_blank">Electron</a>.</h4>

<p align="center">NLP (Natural Language Processing) powered Minimal Text Editor App which fetches citations and facts from the internet for the user's reference to save time taken by switching tabs and manually searching for them.</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>




## Key Features

* LiveCitations - Get information from internet resources for the topic you are writing automatically.
* Resource Pinning - You can save the resources that you would like to use more for the current session.
* Syntax highlighting
* Toolbar for basic formatting
* Full screen mode
  - Write distraction free.
* Cross platform
  - Windows, macOS and Linux ready.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/sudodevs-inc/citewrite.git

# Go into the repository
$ cd citewrite

# Install dependencies
$ npm install

# Run the app
$ npm start
```

To deploy the server instance as to utilize NLP and the developed web search modules:

```bash

# Clone the server repository
$ git clone https://github.com/sudodevs-inc/citewriteBackend.git

# Go into the repository
$ cd citewriteBackend

# Install virtual environment for Python version 3.6.*
$ python3.6 -m pip install virtualenv --user && python3.6 -m virtualenv env

# Activate the environment
$ . env/bin/activate

# Install requirements
$ pip install -r requirements.txt

# Install the spacy 'en' pack
$ spacy download en

# Run the server
$ python main.py

```

## Credits

This software uses the following open source packages:

- [Electron](http://electron.atom.io/)
- [Node.js](https://nodejs.org/)
- [Quilljs](https://github.com/quilljs/quill)
- [Python 3.6.8](https://www.python.org/)
- [Tornado](https://tornadoweb.org)

## License

MIT

---
> [SudoDevs](https://sudodevs.com.com) &nbsp;&middot;&nbsp;
> GitHub [@sudodevs-inc](https://github.com/sudodevs-inc) &nbsp;&middot;&nbsp;

