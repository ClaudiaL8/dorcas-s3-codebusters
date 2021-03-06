import React, { Component } from 'react';
import './stylesheets/App.css';
import CardPage from './components/CardPage';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import flamingo from './images/flamingocardsok.jpg';

const fr = new FileReader();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      json: {
        palette: 1,
        typography: 2,
        name: "María García",
        job: "Front-end developer",
        phone: "+34 666666666",
        email: "mariagar@example.com",
        linkedin: "mariagar",
        github: "mariagar",
        photo: flamingo,
        skills: ["HTML", "Sass", "JavaScript"]
      },
      imageUrl: "",
      urlCard: ""
    };
    this.shareTitle = { comparte: 'comparte', rellena: 'rellena', diseña: 'diseña' }
    this.titleDesign = { colors: "colores", fonts: "fuentes" };
    this.icono = { movil: 'rrss fas fa-mobile-alt', email: 'rrss far fa-envelope', linkedin: 'rrss fab fa-linkedin-in', github: 'rrss fab fa-github-alt' }
    this.changeForm = this.changeForm.bind(this);

    this.writeImages = this.writeImages.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.changeSkills = this.changeSkills.bind(this);  
    this.addNewSelectedSkill = this.addNewSelectedSkill.bind(this);
    this.removeSelectedSkill = this.removeSelectedSkill.bind(this);
    this.reset = this.reset.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
  componentDidMount(){
    this.verifyLocalStorage();
    this.getskills();
  }
  verifyLocalStorage() {
    if (localStorage.getItem('stateStorage')) {
      const stateStorage = JSON.parse(localStorage.getItem('stateStorage'));
      const json = stateStorage.json;
      const skills = stateStorage.skills;
      this.setState({
        json: json
      })
      this.setState({
        skills: skills
      })
    }

  }
  getskills() {
    fetch(
      'https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json'
    )
      .then(function (response) {
        return response.json();
      })
      .then((json) => {
        const habilidades = json.skills;
        this.setState({
          skills: habilidades
        })
      })
  }

   sendRequest(){
    fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
      method: 'POST',
      body: JSON.stringify(this.state.json),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(resp => {return resp.json();})
      .then(result => { this.showURL(result);})
      .catch(error => { console.log(error); });
  }
   showURL(result){
     console.log(result);
    this.setState({
      urlCard: result.cardURL
    })
    console.log(this.state.urlCard);
  }

  changeForm(event) {
    const guilty = event.currentTarget;
    if (guilty.getAttribute('id') === 'name') {
      this.setState((state) => {
        const j = {
          ...this.state.json,
          name: guilty.value
        }
        return (
          { json: j }
        )
      })
    }
    else if (guilty.getAttribute('id') === 'position') {
      this.setState((state) => {
        const j = {
          ...this.state.json,
          job: guilty.value
        }
        return (
          { json: j }
        )
      })
    }
    else if (guilty.getAttribute('type') === 'email') {
      this.setState((state) => {
        const j = {
          ...this.state.json,
          email: 'mailto:' + guilty.value
        }
        return (
          { json: j }
        )

      })
    }
    else if (guilty.getAttribute('type') === 'tel') {
      this.setState((state) => {
        const j = {
          ...this.state.json,
          phone: 'tel:' + guilty.value
        }
        return (
          { json: j }
        )

      })
    }
    else if (guilty.getAttribute('type') === 'linkedin') {
      this.setState((state) => {
        const j = {
          ...this.state.json,
          linkedin: 'https://www.linkedin.com/in/' + guilty.value
        }
        return (
          { json: j }
        )

      })
    }
    else if (guilty.getAttribute('type') === 'github') {
      this.setState((state) => {
        const j = {
          ...this.state.json,
          github: 'https://github.com/' + guilty.value
        }
        return (
          { json: j }
        )

      })
    }
    this.saveStorage();
  }
  saveStorage(){
    localStorage.setItem("stateStorage", JSON.stringify(this.state));
  }

  changeSkills(e) {
    const newSkill = e.currentTarget.value;
    const position = e.currentTarget.getAttribute('data-position');
    const newArray = this.state.json.skills;
    newArray[position] = newSkill;

    const newDataJson = {
      ...this.state.json,
      skills: newArray
    };

    this.setState({
      json: newDataJson
    });
  }

  addNewSelectedSkill() {
    const newSkills = this.state.json.skills;
    if (newSkills.length < 3) {
      newSkills.push("HTML");

      const newDataJson = {
        ...this.state.json,
        skills: newSkills
      };

      this.setState({
        json: newDataJson
      });
    } 
  }

  removeSelectedSkill() {
    const removeSkill = this.state.json.skills;
    if (removeSkill.length > 1) {
      removeSkill.splice(-1,1);

      const newDataJson = {
        ...this.state.json,
        skills: removeSkill
      };

      this.setState({
        json: newDataJson
      });
    }
  }
  handleImage(event) {
    const newImage = event.target.files[0];
    fr.addEventListener('load', this.writeImages);
    fr.readAsDataURL(newImage);
  }

  writeImages() {

    this.setState((state) => {
      const j = {
        ...this.state.json,
        photo: fr.result
      }
      return (
        { json: j, imageUrl: `url("${fr.result}")` }
      )

    })
  }

  reset(){
    const empty = 
    {
      skills: [],
      json: {
      palette: 1,
      typography: 2,
      name: "María García",
      job: "Front-end developer",
      phone: "+34 666666666",
      email: "mariagar@example.com",
      linkedin: "mariagar",
      github: "mariagar",
      photo: flamingo,
      skills: ["HTML", "Sass", "JavaScript"]
    }
  }
  this.setState({
    skills: empty.skills
  })
  this.setState({
    json: empty.json
  })
  localStorage.clear();

  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/CardPage' render={() => 
            <CardPage 
              footerText={this.state.copyRight} 
              shareTitle2={this.shareTitle} 
              titleDesign={this.titleDesign} 
              iconApp={this.icono} 
              skills={this.state.skills} 
              form={this.state.json} 
              changeForm={this.changeForm} 
              changeSkills={this.changeSkills}
              addNewSelectedSkill={this.addNewSelectedSkill}
              removeSelectedSkill={this.removeSelectedSkill}
              reset={this.reset} 
              request={this.sendRequest} 
              urlCard={this.state.urlCard}
              handleImage={this.handleImage} 
              writeImages={this.writeImages} 
              imageUrl={this.state.imageUrl}
            />}
          />

        </Switch>
      </div>
    );
  }
}

export default App;
