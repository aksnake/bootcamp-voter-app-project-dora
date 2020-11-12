import React from "react";
import {
    useParams,
    useHistory,
    Route,
    Switch,
    Link,
    useRouteMatch,
  } from "react-router-dom";
import { Election } from "./Election";
import { Home } from "./Home";
import { Voter } from "./Voter";
import { Ballot } from "../ballots/components/ballots";

import "./VoterApp.css";
import Dora from "../Dora.png";

import { ElectionSelectorForm } from '../ballots/components/electionSelector';
import { ElectionSelectorFormContainer } from "../ballots/containers/electionSelectorContainer";
import { UserIdentificationForm } from "../ballots/components/userIdentification";
import { UserValidation } from "../ballots/components/userValidation";

//Voter Registration Deadlines for Upcoming Elections
//Election Name, Last Day to Register to vote
//You can apply to register to vote right now by filling in the application?
//Already Registered to Vote? Login here

export function VoterApp() {
    return (
        <div className='stretch'>
          <header className='header'>
          <div className='header-div'>
              <div>
              <h1>Elections and Voter Information</h1>
              </div>
            <div>
                <label className='slogan-header'>“Wrong Is Wrong” even if everyone is doing it , “Right Is Right” even if no one is doing it.</label>
            </div>
              </div>              
          </header>
          <div className='rowC'>
            <nav>
                <ul>
                <li>
                    <Link to="/voter/list">Voters</Link>
                </li>
                <li>
                    <Link to="/election">Elections</Link>
                </li>
                </ul>
            </nav>
            <nav>
                <ul>
                {/* <li>
                    <Link to="/">Home</Link>
                </li> */}
                <li>
                    <Link to="/voter/register">Register Voter</Link>
                </li>
                <li>
                  <ElectionSelectorFormContainer/>
                </li>
                </ul>
            </nav>
          </div>
          <main className='main'>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/voter" component={Voter} />
              <Route path="/election" component={Election} />
              <Route path="/ballot" component={Ballot} />
              <Route path="/vote/:id" component={UserValidation}/>
            </Switch>
          </main>
          <footer >
              <div className='footer'> 
              <img src={Dora} className='dora'/>
              <div>
                <label className='vote'>Vote!</label>
                <small>Dora's Election Management Company, Inc.® </small>
              </div>
            </div>
          </footer>
        </div>
    );
};
