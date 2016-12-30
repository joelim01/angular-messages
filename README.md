AngularMessages - Rails/Angular Project

This Flatiron Learn.co final project uses Rails to create a backend API that is consumed by an AngularJS front-end. The main idea of the app is re-capture some of the experience of sending a physical note or letter -- an anticipated but ultimately unknown exact delivery date, the inability to respond immediately -- in an electronic messaging service.

This project uses several off-the-shelf resources including Angular Bootstrap Components, Angular UI Router, Devise and SearchKick among others.

Installation

If you haven't yet, install Ruby and Bundler.

Then, run the following in your command line:

git clone https://github.com/joelim01/angular-messages  
cd angular-messages  
bundle install  
install postgres and create a new db user named angular-messages  
install elasticsearch  
rails db:create  
rails db:migrate  
bower install

Then, run rails s to start up a local server and view the app at localhost:3000 in your browser.

Contributor's Guide

Third party contributions are always welcome! To flag an issue, file a ticket on angular-messages, and provide a detailed explanation of the issue(s). Your feedback is very much appreciated.

License

Copyright (c) 2016 Joseph Lim
