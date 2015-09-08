var texts = {
  who: 'This site is build by <a href="https://github.com/fabiantheblind">Fabian "fabiantheblind" Morón Zirfas</a> for the <a href="http://www.fh-potsdam.de/">University of Applied Sciences Potsdam (Germany)</a> with <i class="fa fa-heart"></i>.',
  what: 'This site is an experiment on location based triggers. Whenever a student needs to know if the Interface Lab is open for consultation he just can load the site. It tells you if the lab is open.',
  why: 'Short version: "Because we can. Long version: It often occurs that students ask per email if the lab is open. This is a simple whay to find out. Also it is a test if location based triggers work accurate.',
  how: 'On the mobile device of the lab supervisor is a location based trigger installed with <a href="https://ifttt.com">ifttt.com</a>. If he enters the area ifttt writes a variable into a google spreadsheets. 1 for yes 0 for no. This gets read from the nodejs application. According to the result of the query the application presents the information. For further deeper insightcheck out the open source code at github.com (coming soon).'
};
exports.who = function(req, res) {
  res.render('about', {
    title: 'Is the lab open?',
    val: 'who?',
    text: texts.who
  });
};

exports.what = function(req, res) {
  res.render('about', {
    title: 'Is the lab open?',
    val: 'what?',
    text: texts.what
  });
};

exports.why = function(req, res) {
  res.render('about', {
    title: 'Is the lab open?',
    val: 'why?',
    text: texts.why
  });
};

exports.how = function(req, res) {
  res.render('about', {
    title: 'Is the lab open?',
    val: 'how?',
    text: texts.how
  });
};