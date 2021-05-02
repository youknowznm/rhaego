import React from 'react'
import c from 'classnames'
import Card from "~/components/Card"
import Loading from "~/components/Loading"
import {
  SvgDeviceHub,
  SvgStar,
} from "~/assets/svg"
import {Link, ajax, get, getPalette, getFontTheme, getTagsFromText, noop} from "~utils"
import Button from "~/components/Button"
import api from "~api"
import style from './repos.scss'
import {MainContext} from "~/modules/Context";

class Repos extends React.Component {

  state = {
    repos: [],
    palette: [],
    isLoading: false,
    emptyReason: null,
  }

  componentDidMount() {
    this.setState({
      palette: getPalette(),
      isLoading: true
    })
    get(api.GET_REPOS)
      .then(res => {
        const repos = res.repos
          .sort((prev, curr) => {
            return -(prev.stargazers_count - curr.stargazers_count)
          })
        this.setState({
          repos,
          emptyReason: repos.length === 0 ? '暂无代码' : null
        })
      })
      .catch(noop)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  renderList = () => {
    const {
      palette,
      isLoading,
      emptyReason,
    } = this.state
    return (
      <Loading
        isLoading={isLoading}
        emptyReason={emptyReason}
      >
        <div className={'repo-list content-pop-in'}>
          {
            this.state.repos.map((item, index) => {
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
              return (
                <a
                  href={html_url}
                  target={'_blank'}
                  key={index}
                >
                  <Card
                    className={'repo-card'}
                    theme={theme}
                    fontTheme={fontTheme}
                    title={name}
                    content={description}
                  >
                    <div className={'tags'}>
                      {
                        item.homepage && (
                          <Button
                            size={'small'}
                            className={'tag'}
                            link={homepage}
                            linkTarget={'_blank'}
                          >
                            演示
                          </Button>
                        )
                      }
                    </div>
                    <div className={'counts'}>
                      <SvgStar className={'starred icon'} fill={fontTheme}/>
                      <span className={'starred count'}>
                      {stargazers_count}
                    </span>
                      <SvgDeviceHub className={'forked icon'} fill={fontTheme}/>
                      <span className={'forked count'}>
                      {forks_count}
                    </span>
                    </div>
                  </Card>
                </a>
              )
            })
          }
        </div>
      </Loading>
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

Repos.contextType = MainContext

export default Repos