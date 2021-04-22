import React from 'react'
import c from 'classnames'
import Card from "~/components/Card"
import {
  SvgDeviceHub,
  SvgStar,
} from "~/assets/svg"
import {get} from '~/utils'
import {GET_REPOS} from '~api'

import style from './repos.scss'
import Button from "~/components/Button";

export default class Repos extends React.Component {

  state = {
    repoList: [],
  }

  ref
  setRef = ref => {
    this.ref = ref
  }

  componentDidMount() {
    get(GET_REPOS).then(res => {
      const repoList = res.data.repoList
        .sort((prev, curr) => {
          return -(prev.stargazers_count - curr.stargazers_count)
        })
        // .filter(item => item.stargazers_count > 0)
      this.setState({
        repoList,
      })
    })
  }

  renderList = () => {
    let palette = [
      'red',
      'pink',
      'purple',
      'indigo',
      'blue',
      'cyan',
      'teal',
      'green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'brown',
      'grey',
      'bluegrey',
    ]
    let getFontTheme = (theme) => {
      return [
        'cyan',
        'green',
        'lime',
        'yellow',
        'amber',
        'orange',
        'grey',
      ].includes(theme) ? 'dark' : 'light'
    }
    palette.sort(() => Math.random() - .5)
    return (
      <div className={'repo-list'}>
        {
          this.state.repoList.map((item, index) => {
            const theme = palette[index % palette.length]
            const fontTheme = getFontTheme(theme)

            const  {
              name,
              html_url,
              created_at,
              description,
              stargazers_count,
              forks_count,
              language,
              homepage,
            } = item

            return <Card
              className={'repo-card'}
              key={index}
              theme={theme}
              fontTheme={fontTheme}
              title={name}
              content={description}
              link={html_url}
              targetIsBlank
            >
              <div className={'tags'}>
                {
                  item.homepage && (
                    <Button
                      size={'small'}
                      className={'tag'}
                      link={homepage}
                      targetIsBlank
                    >
                      演示
                    </Button>
                  )
                }
              </div>
              <div className={'counts'}>
                <SvgStar className={'starred icon'} fill={fontTheme}/>
                <span className={'starred count'}>{stargazers_count}</span>
                <SvgDeviceHub className={'forked icon'} fill={fontTheme}/>
                <span className={'forked count'}>{forks_count}</span>
              </div>
            </Card>;
          })
        }
      </div>
    )
  }

  render() {
    return (
      <div className={'rhaego-repos'}>
        {this.renderList()}
      </div>
    )
  }
}