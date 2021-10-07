import { appAxios } from "./axios.config"

export const getBooksReq = async (sortBy: any, order: any) => {
  console.log(sortBy, order)
  try {
    const res: any = await appAxios({
      method: 'get',
      url: '/get-books',
      params: {
        order: order,
        sortBy: sortBy
      }
    })
    console.log(res)
    return res

    // const res: any = await axios.get(`${baseUrl}/user`)
    // console.log(res)
    // return res
  }
  catch (error: any) {
    console.log(error.response.data.message)
  }
}