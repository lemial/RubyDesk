RubyDesk (fork Brimir)
======
Russian Translations

Installation
------------
RubyDesk is a rather simple Ruby on Rails application. The only difficulty in setting things up is how to get incoming email to work. See the next section for details.

Any Rails application needs a web server with Ruby support first. We use Phusion Passenger (`mod_rails`) ourselves, but you can also use Thin, Puma or Unicorn. Phusion Passenger can be installed for Nginx or Apache, you can chose wichever you like best. The installation differs depending on your distribution, so have a look at their [Nginx installation manual](https://www.phusionpassenger.com/documentation/Users%20guide%20Nginx.html) or their [Apache installation manual](https://www.phusionpassenger.com/documentation/Users%20guide%20Apache.html).

After setting up a webserver, you have to create a database for RubyDesk and modify the config file in `config/database.yml` to reflect the details. Set your details under the production section. We advise to use `adapter: postgresql` or `adapter: mysql2` for production usage, because those are the only two adapters and database servers we test.

Next up: configuring your outgoing email address and url. This can be set in `config/environments/production.rb` by adding the following lines *before* the keyword `end`:

    config.action_mailer.default_options = { from: 'rubydesk@yoururl.com' }

    config.action_mailer.default_url_options = { host: 'rubydesk.yoururl.com' }

Now install the required gems by running the following command if you want **PostgreSQL support**:

    bundle install --without mysql development test --deployment

Run the following command to install gems if you want **MySQL support**:

    bundle install --without postgresql development test --deployment

Next, load the database schema and precompile assets:

    rake db:schema:load RAILS_ENV=production
    rake assets:precompile RAILS_ENV=production

Last thing left to do before logging in is making a user and adding some statuses. You can do this by running:

    bin/rails console production
    u = User.new({ email: 'your@email.address', password: 'somepassword', password_confirmation: 'somepassword' }); u.agent = true; u.save!

Incoming email
--------------
Incoming emails can be posted to the tickets url by using the script found in scripts/post-mail. Create an alias in your `/etc/aliases` file like this:

    rubydesk: "|/bin/bash /path/to/your/rubydesk/repo/script/post-mail http://yoururl.com/tickets.json"

Now sending an email to rubydesk@yoururl.com should start curl and post the email to your rubydesk installation.

License
-------
RubyDesk is licensed under the GNU Affero General Public License Version 3.

