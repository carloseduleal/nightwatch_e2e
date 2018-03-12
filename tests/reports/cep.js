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
    }, 200);
  },

  afterEach : function(browser, done) {
    browser.end()

    setTimeout(function() {
      done();
    }, 200);
  },

  'Generating CEP Report (letter CUSUM)' : function (browser) {
    const home = browser.page.home_page();
    const cep = browser.page.reports.cep_form_page();
    const cusum = browser.page.reports.cusum_report_page();

    const expected_cusum_report = {
        'media': 'Média: 4.1486153846154',
        'desvio_padrao': 'Desvio padrão: 0.0067176003041379',
        'cp': 'Cp: 124.05223526324',
        'cpk': 'Cpk: -42.246465842879',
        'vn':'VN: 4.15'
    }

    home
      .click('@menu_reports')
      .click('@reports_cep')
    cep
      .waitForElementVisible('@cep_form', 4000)
      .setValue('@combo_class','10 - SINGLE-MODE')
      .setValue('@combo_letter','CUSUM')
      .setValue('@combo_productive_area', 'PCVD')
      .setValue('@combo_reference_area', 'PCVD')
      .setValue('@combo_period', 'DETERMINADO')
      .setValue('@combo_equipamento', 'PCVD - PCDV1')
      .setValue('@combo_process_code', '11 - MCSM')
      .setValue('@combo_process_parameter', 'DELTA_CORE')
      .setValue('@combo_reference_date', 'PCVD date')
      .setValue('@input_start','Fri Mar 09 2018')
      .setValue('@input_end','Fri Mar 09 2018')
      .click('@cep_form')
      .click('@cep_form')
      .click('@button_search')

      cusum.waitForElementVisible('@title_report_cusum', 7000)
      cusum.expect.element('@title_report_cusum').text.to.equal('Carta de Controle CUSUM - DELTA_CORE')
      cusum.expect.element('@value_media').text.to.equal(expected_cusum_report.media)
      cusum.expect.element('@value_desvio_padrao').text.to.equal(expected_cusum_report.desvio_padrao)
      cusum.expect.element('@value_cp').text.to.equal(expected_cusum_report.cp)
      cusum.expect.element('@value_cpk').text.to.equal(expected_cusum_report.cpk)
      cusum.expect.element('@value_vn').text.to.equal(expected_cusum_report.vn)
  },

  'Generating CEP Report (letter X)' : function (browser) {
    const home = browser.page.home_page();
    const cep = browser.page.reports.cep_form_page();
    const x = browser.page.reports.x_report_page();

    const expected_x_report = {
        'media': 'Média: 4.1486153846154',
        'desvio_padrao': 'Desvio padrão: 0.0067176003041379',
        'cp': 'Cp: 124.05223526324',
        'cpk': 'Cpk: -42.246465842879',
        'positive_3_sigmas':'+3 sigmas: 4.1687681855278',
        'negative_3_sigmas':'-3 sigmas: 4.128462583703',
        'positive_sigma':'+sigma:',
        'negative_sigma':'-sigma:',
        'lie':'LIE: 4.105',
        'lse':'LSE: 4.195'
    }

    home
      .click('@menu_reports')
      .click('@reports_cep')
    cep
      .waitForElementVisible('@cep_form', 4000)
      .setValue('@combo_class','10 - SINGLE-MODE')
      .setValue('@combo_letter','X')
      .setValue('@combo_productive_area', 'PCVD')
      .setValue('@combo_reference_area', 'PCVD')
      .setValue('@combo_period', 'DETERMINADO')
      .setValue('@combo_equipamento', 'PCVD - PCDV1')
      .setValue('@combo_process_code', '11 - MCSM')
      .setValue('@combo_process_parameter', 'DELTA_CORE')
      .setValue('@combo_reference_date', 'PCVD date')
      .setValue('@input_start','Fri Mar 09 2018')
      .setValue('@input_end','Fri Mar 09 2018')
      .click('@cep_form')
      .click('@cep_form')
      .click('@button_search')

     x.waitForElementVisible('@title_report_x', 7000)
     x.expect.element('@title_report_x').text.to.equal('Report - Carta CEP X')
     x.expect.element('@value_media').text.to.equal(expected_x_report.media)
     x.expect.element('@value_desvio_padrao').text.to.equal(expected_x_report.desvio_padrao)
     x.expect.element('@value_cp').text.to.equal(expected_x_report.cp)
     x.expect.element('@value_cpk').text.to.equal(expected_x_report.cpk)
     x.expect.element('@value_positive_3_sigmas').text.to.equal(expected_x_report.positive_3_sigmas)
     x.expect.element('@value_negative_3_sigmas').text.to.equal(expected_x_report.negative_3_sigmas)
     x.expect.element('@value_positive_sigma').text.to.equal(expected_x_report.positive_sigma)
     x.expect.element('@value_negative_sigma').text.to.equal(expected_x_report.negative_sigma)
     x.expect.element('@value_lie').text.to.equal(expected_x_report.lie)
     x.expect.element('@value_lse').text.to.equal(expected_x_report.lse)
  }

};
