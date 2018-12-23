import React from "react";
import { withRouter } from "react-router-dom";
import SnakeMenu from "./SnakeMenu";
import { idle } from "../util";

import "./HomePage.css";

const HomePage = ({ history }) => (
  <div className="HomePage">
    <SnakeMenu
      items={[
        {
          title: "Hey there",
          tabs: [
            {
              title: "Click me!",
              onClick: () => alert("NOOOOOO!"),
              tabs: [
                {
                  title: "what's up?",
                  onClick: idle,
                  tabs: [
                    {
                      title: "the sky",
                      onClick: () => alert("funny ain't you"),
                      tabs: []
                    },
                    {
                      title: "not much",
                      onClick: () => alert("K"),
                      tabs: []
                    },
                    {
                      title: "I am sad",
                      onClick: idle,
                      tabs: [
                        {
                          title: "what happenned?",
                          onClick: idle,
                          tabs: [
                            {
                              title: "Bad stuff",
                              onClick: () => alert(":("),
                              tabs: []
                            }
                          ]
                        }
                      ]
                    },
                    { title: "I'm fine", onClick: () => alert("K"), tabs: [] }
                  ]
                },
                {
                  title: "how you doin'",
                  onClick: idle,
                  tabs: [{ title: "good", onClick: () => alert("K"), tabs: [] }]
                }
              ]
            },
            {
              title: "Do not click!",
              onClick: () => alert("Yeah"),
              tabs: []
            }
          ],
          onClick: idle
        },
        {
          title: "What is it?",
          tabs: [
            {
              title: "It's a snake",
              tabs: [
                {
                  title: "Show me parallax",
                  onClick: () => history.push("/parallax"),
                  tabs: []
                },
                {
                  title: "Show me infinity",
                  onClick: () => history.push("/infinity"),
                  tabs: []
                }
              ],
              onClick: idle
            }
          ],
          onClick: idle
        }
      ]}
    />
  </div>
);

export default withRouter(HomePage);
