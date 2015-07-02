Package.describe({
  name: "nicolaiwadstrom:meteor-accounts-angellist",
  summary: "Login service for AngelList accounts, that works with the meteor standard accounts package.",
  version: "0.0.15",
  git: "https://github.com/nicolaiwadstrom/meteor-accounts-angellist.git"
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.2');
	api.use('underscore', ['server']);
	api.use('accounts-base', ['client', 'server']);
	// Export Accounts (etc) to packages using this one.
	api.imply('accounts-base', ['client', 'server']);
	api.use('accounts-oauth', ['client', 'server']);
	api.use('nicolaiwadstrom:meteor-angellist@0.0.1', ['client', 'server']);

	api.use('http', ['client', 'server']);

	api.addFiles('angellist_login_button.css', 'client');

	api.addFiles("angellist.js");
});