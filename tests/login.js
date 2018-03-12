module.exports = {

  before : function(browser) {
    browser.url(browser.launch_url)
  },

  after : function(browser) {
    browser.end();
  },

  'Login to Prysmian' : function (browser) {
    const login = browser.page.login_page();

    login
      .click('@button_login')
      .setValue('@input_login', process.env.USERNAME)
      .setValue('@input_password', process.env.PASSWORD)
      .click('@button_submit')
      .waitForElementVisible('@message_login_success', 4000)
      .expect.element('@message_login_success').text.to.equal('Login successful.')
  }
};
