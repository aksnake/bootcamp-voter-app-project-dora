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
import { Vote } from "./Vote";
import { Voter } from "./Voter";

import "./VoterApp.css";
import Dora from "..//Dora.png";

export function VoterApp() {
    return (
        <div>
          <header>
            <h1>Voter App</h1>
          </header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/voter/register">Register Voter</Link>
              </li>
              <li>
                <Link to="/voter">Voters</Link>
              </li>
              <li>
                <Link to="/election">Election</Link>
              </li>
              <li>
                <Link to="/vote">Vote</Link>
              </li>
            </ul>
          </nav>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/voter" component={Voter} />
              <Route path="/election" component={Election} />
              <Route path="/vote" component={Vote} />
            </Switch>
          </main>
          <footer>
              <div>
              <img src={Dora} alt="website logo" width={100} height={100}/>
              <small>Dora's Election Management Company, Inc.</small>
            </div>
          </footer>
        </div>
    );
};
