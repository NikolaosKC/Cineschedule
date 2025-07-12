The Cineschedule website is a peculiar beast that used to encounter various complications depending on how it is ran, but it should be fine now.
Two separate versions of the website are available:
	1. A server version, found in a folder labelled "Server" on the main branch, designed to be run exclusively on a server, even a local one, and written with far less copy-pasted code.
	2. A local version, found in a folder labelled "Local" on the main branch, designed to be run locally from one's device and written with far more copy-pasted code. Can also be ran on a server for wider browser support.

1a.
	The server version will not function directly from one's device, no matter what browser.
	It depends on a JQuery method known as .load(), which includes/imports other HTML files within other HTML files.
	I used this method to include the file for the navbar and footer on all other pages.
	This method is blocked when running locally, so the navbar/footer file becomes inaccessible.
	This also means pages lose CSS and Bootstrap designs.
	This is because all links to those designs are found only in the navbar/footer file, which is blocked, in an attempt to cut down on code bloat.

1bi.
	A server method is recommended for this version.
	Its performance has been significantly improved by removing JavaScript and JQuery connections from the navbar/footer file and inserting them in all other files.
	.load() can function through a server, allowing the navbar/footer file and its contents to be accessible.
	Additionally, no matter what storage form is used, whether localStorage or cookies (see 2ai), saved contents can be found across all pages on any browser.

1bii.
	In my case, I used a local server.
	To run this server, I used an extension available on Visual Studio Code (VSC).
	It was developed by Ritwick Dey, and is known as Live Server.
	Upon installation, after opening a given file on VSC, one can find a button in the bottom-right corner that says "Go Live".
	Open a HTML file in VSC, click "Go Live", and the HTML file will open as a webpage within your default browser, with a HTTP link given.
	One can even copy-paste the HTTP link from the default browser and paste it into another browser, and it will run the same website.

2ai.
	The local version is best designed for Chromium browsers such as Google Chrome, Microsoft Edge and Opera.
	Instead of cookies, both versions of the website depend on a storage format known as localStorage.
	Assuming one is using a Chromium browser, if anything is stored using localStorage on one page, it will also be used on other pages.
	This can be seen with the task table and lightmode setting, the states of which persist on other pages.
	
2aii.
	This does not work on browsers such as Firefox. Anything stored with localStorage on any one page will not be used on another page.
	This means that the task table and lightmode settings will not work as intended.
	However, running on a server (see 1b) fixes this problem and allows saved contents to transfer across webpages on any browser.

2b.
	Lots of copy-pasted code is used across multiple pages in this version, particularly to render the navbars and footers.
	This is because a JQuery method I used known as .load() (see 1a) does not work locally, so to compensate, code was copy-pasted.
	This method only works on servers (see 1bi) and allows for reduced code bloat.