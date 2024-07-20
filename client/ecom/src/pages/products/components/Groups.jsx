import { useContext, useEffect, useState } from "react"
import { Button, Spinner } from "react-bootstrap"
import { ThemeContext } from "../../../redux/context/ThemeContext";
import { useGetProductGroupsQuery, useGetProductsBySlugMutation } from "../../../services/api";
import { Outlet, useParams } from "react-router-dom";
import useInfinteScroll from "@/hooks/useInfinteScroll";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import '../products.css'

export function SlugView() {
  const { category, slug, childslug } = useParams()
  const url = [category, slug, childslug].filter(String)

  const [
    getProducts, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useGetProductsBySlugMutation()

  const infiniteScroll = useInfinteScroll(getProducts, url.join('/'))
  return (

    <div className="row w-100 " style={{ 'zIndex': '1', 'display': 'flex', 'flexDirection': 'column', 'textAlign': 'start' }}>
      {(!isUpdating && !infiniteScroll.data) && (
        <Spinner animation="border" variant="secondary" />
      )}
      <InfiniteScroll
        dataLength={infiniteScroll.data.length}
        next={infiniteScroll.reFetchData}
        hasMore={infiniteScroll.hasMore}
        useWindow={false}
        // scrollableTarget="scrollableDiv"
        className='wrapper'
        style={{ "display": "grid" }}
        loader={<p>Loading...</p>}
        endMessage={<p style={{ textAlign: "center" }}>No more data to load.</p>}
      >
        {infiniteScroll.data.map(item => (
          <ProductCard item={item} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

function Children({ obj, linkColor }) {
  if (!('children' in obj)) {
    return;
  }
  return (
    obj.children.map(child => (
      <a
        className={`link-${linkColor} link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover`}
        href={"tuoteryhmat/" + child.slug}
        key={child.id}
        style={{ "display": "block", "fontWeight": "350" }}>
        {child.name}
      </a>
    )
    )
  )
}

function Groups() {
  const { themeDark } = useContext(ThemeContext);
  const [childPath, setChildPath] = useState(null)
  const [hoverOff, setHoverOff] = useState(false)

  const groupClicked = (index) => {
    setHoverOff(true)
    setChildPath(index)
  }
  const groupHover = (index) => {
    if (!hoverOff) {
      setChildPath(index)
    }
  }
  const {
    data: path,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetProductGroupsQuery()

  // console.log(path)
  const variant = themeDark ? "light" : "dark"
  const linkColor = !themeDark ? "light" : "dark"
  return (
    <>
      <ul className={`p-0 bg-${variant}`}
        style={{
          "minWidth": "30vh", "display": "inline-block", "listStyleType": "none", "backgroundColor": "white",
          "height": "100%", "verticalAlign": "top", "overflowY": "scroll", "overflowX": "hidden"
        }}>
        {!isLoading ?
          path.navigation.map((group, index) =>
          (<li className="" style={{ "textAlign": "center" }} key={group.id}>
            <Button
              onClick={() => groupClicked(index)}
              onMouseEnter={() => groupHover(index)}
              variant={variant}
              style={{ "display": "block", "width": "100%", "borderLeftStyle": (index === childPath && hoverOff) ? "solid" : "none", "borderLeftColor": "#32BF6F", "borderLeftWidth": "4px" }}>
              {group.name}
            </Button>
          </li>)
          ) : <div>Loading</div>}
      </ul>
      <div className="group" style={{ "display": "flex", "overflowY": "auto", "flexGrow": "1", "padding": "8" }}>
        <div style={{ "display": "flex", "flex": "1", "alignItems": "flex-start", "position": "relative" }}>
          <div
            style={{ "display": "block", "columns": "250px", "width": "100%" }}>
            {(childPath !== null && !isLoading) ?
              path.navigation[childPath].children.map((child, index) =>
              (
                <div className="" style={{ "display": "block", "breakInside": "avoid-column" }} key={child.id}>
                  <a
                    className={`link-${linkColor} link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover`}
                    href={"tuoteryhmat/" + child.slug} key={child.id}
                    style={{ "display": "block", "fontWeight": "500" }}>{child.name}</a>
                  <Children obj={child} linkColor={linkColor} />
                </div>
              )
              )
              : null}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Groups