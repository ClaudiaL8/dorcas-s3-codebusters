import React, { Component } from 'react';
import './stylesheets/App.css';
import CardPage from './components/CardPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyRight: 'Awesome profile-cards @2018',
      skills: [],
      json: {
          palette: 1,
          typography: 2,
          name : "María García",
          job: "Front-end developer",
          phone: "+34 666666666",
          email: "mariagar@example.com",
          linkedin: "mariagar",
          github: "mariagar",
          photo: "data:image/png;base64,2342ba...",
          skills: ["HTML", "Sass", "JavaScript"]
      }
    };
    this.getskills();
    this.shareTitle = { comparte: 'comparte', rellena: 'rellena', diseña: 'diseña' }
    this.titleDesign = { colors: "colores", fonts: "fuentes" };
    this.icono = { movil: 'rrss fas fa-mobile-alt', email: 'rrss far fa-envelope', linkedin: 'rrss fab fa-linkedin-in', github: 'rrss fab fa-github-alt' }
    this.changeForm = this.changeForm.bind(this);
  }
  getskills() {
    fetch(
      'https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json'
    )
      .then(function (response) {
        return response.json();
      })
      .then( (json) => {
        const habilidades = json.skills;
        this.setState({
          skills: habilidades
        })
      })
  }

  changeForm(event) {
    const guilty = event.currentTarget;
  if (guilty.getAttribute ('id')=== 'name'){
    this.setState ((prevState) => {
      const j = {
        ...this.prevState.json,
        name: guilty.value
      }
    return (
      {json: j}
    )
  })
  }
  else if (guilty.getAttribute ('id')=== 'position'){
    this.setState ((prevState) => {
      const j = {
        ...this.prevState.json,
        job: guilty.value
      }
    return (
      {json: j}
    )
  })
  } 
  
}
  

  render() {
    return (
      <div className="App">
        <CardPage footerText={this.state.copyRight} shareTitle2={this.shareTitle} titleDesign={this.titleDesign} iconApp={this.icono} skills={this.state.skills} form={this.state.json} changeForm={this.changeForm}/>
      </div>
    );
  }
}

export default App;
