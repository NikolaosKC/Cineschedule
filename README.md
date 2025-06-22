The Cineschedule website is a peculiar beast that encounters various complications depending on how it is ran.
Two separate versions of the website are available:
	1. [NOT RECOMMENDED] The main one, immediately visible in the main branch upon opening the repository, designed to be run on a server, even a local one, and written with far less copy-pasted code.
	2. [RECOMMENDED] A local version, found in a folder labelled "Local" on the main branch, designed to be run locally from one's device and written with far more copy-pasted code.

1a.
	The main version will not function directly from one's device, no matter what browser.
	There is firm dependence on a JQuery method known as .load().
	This method is used to include/import other HTML files within other HTML files.
	In my case, I used this method to include the file for the navbar and footer on all other pages.
	This method is blocked when running locally, causing pages to lose CSS and Bootstrap designs.
	This is because all links to those designs are found only in the navbar/footer file in an attempt to cut down on code bloat.
	Because .load() is blocked locally, the navbar/footer file becomes inaccessible.

1bi.
	A server method is recommended for this version, even if its performance, particularly regarding the navbar and footer as those are imported from other files, is slow and unstable.
	This is not only because .load() can function through a server, allowing the navbar/footer file and its contents to be accessible.
	It is also because no matter what storage form is used, whether localStorage or cookies (see 2ai), its contents can be found across all pages on any browser.

1bii.
	In my case, I used a local server.
	To run this server, I used an extension available on Visual Studio Code (VSC).
	It was developed by Ritwick Dey, and is known as Live Server.
	Upon installation, after opening a given file on VSC, one can find a button in the bottom-right corner that says "Go Live".
	Open a HTML file in VSC, click "Go Live", and the HTML file will open as a webpage within your default browser, with a HTTP link given.
	One can even copy-paste the HTTP link from the default browser and paste it into another browser, and it will run the same website.

2ai.
	The local version is best designed for Chromium browsers such as Google Chrome, Microsoft Edge and Opera.
	This is because instead of cookies, both versions of the website entirely depend on a storage format known as localStorage.
	Assuming that one is using a Chromium browser, if anything is stored using localStorage on one page, it will also be used on other pages.
	This can be seen with the task table and lightmode setting, the states of which persist on other pages.
	
2aii.
	This does not work on browsers such as Firefox. Anything stored with localStorage on any one page will not be used on another page.
	This means that the task table and lightmode settings will not work as intended.

2b.
	No matter what browser you use for the local version, lots of copy-pasted code is used across multiple pages, particularly for the navbar and footer.
	This is because a JQuery method I used known as .load() (see 1a) does not work locally, so to compensate, code was copy-pasted.
	This method only works on servers (see 1bi) and allows for reduced code bloat.
	That being said, as this version of the site is being run locally, any buttons pressed in the navbar and footer respond flawlessly.
	I strongly recommend this version even if it does not work on Firefox, because it feels better to use.