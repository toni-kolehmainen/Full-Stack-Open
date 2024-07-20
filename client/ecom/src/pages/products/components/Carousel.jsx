import { useCallback, useEffect, useRef, useState } from "react";
import { useGetProductsMutation } from "../../../services/api";
import ProductCard from "./ProductCard";
import '../products.css'
import debounce from "lodash.debounce";
import { round } from "lodash";

function Carousel(props) {
  const [products, setProducts] = useState([])
  const itemsRef = useRef(null);
  const wrapper = useRef(null);
  const [index, setIndex] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0);

  const debouncedSmoothScroll = useCallback(debounce(scroll => {
    scrollToCat(products[scroll])
    setIndex(scroll)
  }
    , 300), [products]
  )
  const debounceChangeScroll = useCallback(debounce(scroll => {
    scrollToCat(products[scroll])
    setIndex(scroll)
  }
    , 500), [products]
  )

  const smoothScroll = () => {
    let scroll = round(scrollPosition / 180)
    if (scroll - index >= 0.5 || scroll - index < - 0.5) {
      debouncedSmoothScroll(scroll)
    } else {
      debouncedSmoothScroll(index)
    }
  }

  const handleScroll = () => {
    if (wrapper.current) {
      const { scrollTop, scrollLeft } = wrapper.current;
      setScrollPosition(scrollLeft)
    }
  };

  const [
    getProducts,
    { isLoading: isUpdating },
  ] = useGetProductsMutation()

  useEffect(() => {
    setClientWidth(wrapper.current.clientWidth)
    setIndex(0)
    async function fetchData() {
      const response = await getProducts();
      setProducts(response.data)
    }
    fetchData();
  }, [])

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat)
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }
  const handleRight = () => {
    if (round((wrapper.current.scrollWidth - wrapper.current.clientWidth) / 180) >= index + 1) {
      scrollToCat(products[index + 1])
      setIndex(index + 1)
    }
  }

  const handleLeft = () => {
    if (index - 1 >= 0) {
      scrollToCat(products[index - 1])
      setIndex(index - 1)
    }
  }

  if (wrapper.current) {
    if (clientWidth !== wrapper.current.clientWidth) {
      debounceChangeScroll(index)
    }
  }

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel"
      style={{ "overflow": "hidden, hidden" }}
    >
      <div
        ref={wrapper}
        onScroll={handleScroll}
        onMouseUp={smoothScroll}
        className="content" style={{ "gridTemplateColumns": `repeat(${products.length}, auto )` }}
      >
        {
          (!isUpdating & products.length !== 0) ?
            products.map(item => (
              <div ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(item, node);
                } else {
                  map.delete(item);
                }
              }} style={{ "display": "flex" }}
                key={item.ean}>
                <ProductCard item={item} />
              </div>
            )) :
            <div>loading</div>
        }
      </div>
      <button style={{ "overflow": "hidden" }} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={handleLeft}>
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button style={{ "overflow": "hidden" }} className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={handleRight}>
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Carousel