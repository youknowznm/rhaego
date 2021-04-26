import React from 'react';
import c from 'classnames'
import Card from "~/components/Card";
import Loading from "~/components/Loading";
import {
  SvgDeviceHub,
  SvgStar,
} from "~/assets/svg";
import {Link, ajax, get, getPalette, getFontTheme, getTagsFromText} from "~/utils";

import Button from "~/components/Button";
import {GET_REPOS} from "~api";

import style from './repos.scss'
export default class repos extends React.Component {

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

    get(GET_REPOS)
      .then(res => {
        const repos = res.data.repos
          .sort((prev, curr) => {
            return -(prev.stargazers_count - curr.stargazers_count)
          })
        this.setState({
          repos,
          emptyReason: repos.length === 0 ? '暂无代码仓库(这合理吗?)' : null
        })
      })
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
      <Loading isLoading={isLoading} emptyReason={emptyReason}>
        <div className={'repo-list'}>
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

              return <Card
                className={'repo-card'}
                key={index}
                theme={theme}
                fontTheme={fontTheme}
                title={name}
                content={description}
                link={html_url}
                linkTarget={'_blank'}
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
                  <span className={'starred count'}>{stargazers_count}</span>
                  <SvgDeviceHub className={'forked icon'} fill={fontTheme}/>
                  <span className={'forked count'}>{forks_count}</span>
                </div>
              </Card>;
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