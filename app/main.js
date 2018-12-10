import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'
import Root from './components/root'

render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('main')
)


/* TODOS: + sort in main lists
              - students: sort by campus, name, gpa, rank*, followers*
              - campus: sort by name, number of members
          + add/remove students from campuses
              - remove button on member cards in single club view
              - select menu to see all campuses and add student to a campus in single student view
              - select menu to see/add students without campuses to a campus in single campus view
          + add club(campus) ranks, select menu to assign them once a member is in a club, default to base rank when member joins for first time
              - order members list in a club by their member rating/ranks(ranks first, then sort within ranks by rating)
              - create new members without rating, only assign when they are in a club from the members page
          + rename files and components and everything else to club/members(or don't and say we did)
          + more club functionality
              - club ownership
                  > highest rank is reserved for club starter
              - club events pages
                  > add/remove events, display all, filter/sort by date
                  > list of people attending 
                  > show list of events members plan to attend on their individual pages
              - club pictures page
                  > add pictures with titles, short descriptions, upload date, name of poster
          + more member functionality
              - bio
              - picture album(similar to club but personalized)
              - follower functionality(eager load followers and following)
                  > follow/unfollow someone
                  > views for all followers/followed on a members page
              - short blog posts?
          + post messages on club(topic/title and author) and member pages(author) with dates
          + DB UPDATES:
              - member
                  > followers self relationship
                  > bio
                  > picture album - new table needed?
                  > blogs
                  > comments
                  > rank in club
              - club
                  > club ownership relationship
                  > picture album
                  > comments
              - new models:
                  > events
                  > posts/comments - store these on other models or give their own and define relationships?
                  
          + **WAY MORE AMBITIOUS STUFF**
              - ability to upload photo from device
              - login functionality
                - club ownership/rank admin functionality
                    > only club owner can remove club
                    > only club owner(maybe other high club ranks) can edit club information or remove events/pictures and edit other members ranks
                    > only certain ranks can add events/pictures to the club page
                - only users who can edit or remove their own member page is that member               
*/