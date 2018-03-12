module.exports = {

  beforeEach : function(browser, done) {
    const login = browser.page.login_page();

    login
      .navigate()
      .click('@button_login')
      .setValue('@input_login', process.env.USERNAME)
      .setValue('@input_password', process.env.PASSWORD)
      .click('@button_submit')
      .waitForElementVisible('@message_login_success', 4000)
      .expect.element('@message_login_success').text.to.equal('Login successful.')

      setTimeout(function() {
        done();
      }, 100);
  },

  afterEach : function(browser, done) {
    browser.end()

    setTimeout(function() {
      done();
    }, 100);
  },

  'Generating Analysis and Correlation Report' : function (browser) {
    const home = browser.page.home_page();
    const analysis_correlation = browser.page.reports.analysis_correlation_form_page();
    const correlation_report = browser.page.reports.analysis_correlation_report_page();

    const expected_correlation_report = {
        'media': 'Média: 948.84615384615',
        'desvio_padrao': 'Desvio padrão: 87.19297784005',
    }

    home
      .click('@menu_reports')
      .click('@reports_analysis_correlation')

    analysis_correlation
      .setValue('@combo_class','10 - SINGLE-MODE')
      .setValue('@combo_productive_area_y', 'PCVD')
      .setValue('@combo_productive_area_x', 'DRAWING')
      .setValue('@combo_period', 'DETERMINADO')
      .setValue('@combo_process_code', '11 - MCSM')
      .setValue('@combo_parameter_y', 'Comprimento útil - preforma core')
      .setValue('@combo_parameter_x', 'Data Final puxamento')
      .setValue('@input_start', 'Sun Mar 11 2018')
      .setValue('@input_end', 'Sun Mar 11 2018')
      .click('@analysis_correlation_form')
      .click('@analysis_correlation_form')
      .click('@button_search')

    correlation_report.waitForElementVisible('@title_report_correlation', 7000)
    correlation_report.expect.element('@title_report_correlation').text.to.equal('Relatório de análise e correlação')
    correlation_report.expect.element('@value_media').text.to.equal(expected_correlation_report.media)
    correlation_report.expect.element('@value_desvio_padrao').text.to.equal(expected_correlation_report.desvio_padrao)


  }

};
