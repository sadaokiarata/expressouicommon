import {FormatMessage} from "react-globalize";
import React from "react";

import styles from "./auth.sass";

export default class Auth extends React.Component {
  componentWillMount() {
    this.setState({});
  }

  componentDidMount() {
    // this.focusEmail();
  }

  componentDidUpdate() {
    // this.focusEmail();
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.onLogin();
  }

  focusEmail() {
    this.refs.email.focus();
  }

  showLogin(event) {
    event.preventDefault();
    this.setState({
      view: "login"
    });
  }

  showSignup(event) {
    event.preventDefault();
    this.setState({
      view: "signup"
    });
  }

  showReset(event) {
    event.preventDefault();
    this.setState({
      view: "reset"
    });
  }

  render() {
    var content;
    var facebookForm = (
      <form action="#" className={styles.facebookArea}>
        <button
          id="auth--facebook"
          type="button"
          onClick={this.handleLogin.bind(this)}>
          <i className={styles.facebookIcon}></i> <FormatMessage>Enter using Facebook</FormatMessage>
        </button>
        <div className={styles.whyArea}>
          <p><strong>Por que o Facebook?</strong>É uma forma segura e prática que visa a sua proteção, ou seja, menor é o risco de uma pessoa qualquer se passar por você em nossa loja. Evitamos também ter que armazenar e gerenciar sua senha de acesso e outros dados sensíveis a sua privacidade em nossos servidores já que delegamos esta tarefa a tal provedor.</p>
          <p><strong>Privacidade</strong>Ao entrar com sua conta do Facebook, você disponibiliza o mínimo de informações possíveis, que é seu e-mail e alguns dados como seu nome e imagem do perfil. Não teremos acesso a sua lista de amigos e muito menos acesso para postar algo por você.</p>
          <p><strong>Dúvidas</strong>Se tiver qualquer dúvida ou sugestão fale conosco clicando na caixa abaixo "Posso Ajudar?".</p>
        </div>
      </form>
    );

    /* Temporarily disable email signup/login.
    switch (this.state.view) {
      case "signup":
      content = (
        <div>
          {facebookForm}
          <p className={styles.or}>Or</p>
          <form id="auth--signup" action="#" onSubmit={this.handleSignup}>
            <div id="auth--signup-email">
              <input
                ref="email"
                type="text"
                className={styles.textInput}
                placeholder="E-mail">
              </input>
              <small className={styles.smallText}>
                {"Já tem conta? "}
                <a href="#" onClick={this.showLogin}>Entrar</a>
              </small>
            </div>
            <div id="auth--signup-submit">
              <button type="submit">Criar cadastro</button>
            </div>
          </form>
        </div>
      );
      break;

      case "signup-sent":
      content = (
        <div>
          <h4>E-mail enviado</h4>
          <p>Siga as instruções enviadas em seu e-mail &lt;rxaviers@gmail.com&gt;.</p>
        </div>
      );
      break;

      case "reset":
      content = (
        <div>
          {facebookForm}
          <p className={styles.or}>Or</p>
          <form id="auth--reset" action="#">
            <div id="auth--reset-email">
              <input
                ref="email"
                type="text"
                className={styles.textInput}
                placeholder="E-mail">
              </input>
              <small className={styles.smallText}>
                {"Lembrou a senha? "}
                <a href="#" onClick={this.showLogin}>Entrar</a>
              </small>
            </div>
            <div id="auth--reset-submit">
              <button type="submit">Refazer senha</button>
            </div>
          </form>
        </div>
      );
      break;

      case "reset-sent":
      content = (
        <div/>
      );
      break;

      // case "login"
      default:
      content = (
        <div>
          {facebookForm}
          <p className={styles.or}>Or</p>
          <form id="auth--login" action="#" onSubmit={this.handleLogin}>
            <div id="auth--login-email">
              <input
                ref="email"
                type="text"
                className={styles.textInput}
                tabIndex="1"
                placeholder="E-mail">
              </input>
              <small className={styles.smallText}>
                {"Precisa de uma conta? "}
                <a href="#" onClick={this.showSignup}>Criar</a>
              </small>
            </div>
            <div id="auth--login-passwd">
              <input type="password" className={styles.textInput} tabIndex="2" placeholder="Senha"></input>
              <small className={styles.smallText}>
                {"Esqueceu sua senha? "}
                <a href="#" onClick={this.showReset}>Refazer</a>
              </small>
            </div>
            <div id="auth--login-submit">
              <button tabIndex="3" type="submit">Entrar</button>
            </div>
          </form>
        </div>
      );
      break;
    }
    */

    content = facebookForm;

    return (
      <div id="auth" className={styles.main}>
        {content}
      </div>
    );
  }
}
