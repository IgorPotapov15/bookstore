import { prevPage, nextPage, setPage } from "../redux/booksSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const Pagination = () => {
  const totalItems = useAppSelector(state => state.books.totalItems)
  const page = useAppSelector(state => state.books.page)
  const dispatch = useAppDispatch()

  const pageNumber = []

  for (let i = 1; i <= Math.ceil(totalItems / 5); i++) {
		pageNumber.push(i);
	}

  console.log(totalItems)

  let showStart
	let showEnd

  if (pageNumber.length > 5) {
		if (pageNumber.indexOf(page) > 2) {
			showStart = page - 3;
			showEnd = page + 2;
		} else {
			showStart = 0;
			showEnd = 5;
		}
	
		if (pageNumber.lastIndexOf(page) > pageNumber.length - 4) {
			showStart = pageNumber.length - 5;
			showEnd = pageNumber.length;
		}
	}

  return(
    <footer>
				<ul>
					{
						(page > 1) &&
						<li onClick={() => dispatch(prevPage())}>
							<a>{'<<'}</a>
						</li>
					}
					{
						pageNumber.slice(showStart, showEnd).map(number => (
							<li className={`${number === page ? 'page-active' : ''}`} key={number} onClick={() => dispatch(setPage(number))}>
								<a className={`${number === page ? 'page-link-active' : ''}`}
								>
									{number}
								</a>
							</li>
						))
					}
					{
						(page < pageNumber.length) &&
						<li onClick={() => dispatch(nextPage())}>
							<a>{'>>'}</a>
						</li>
					}
				</ul>
			</footer>
  )

}

export default Pagination