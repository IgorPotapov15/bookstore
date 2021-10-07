import { appAxios } from "./axios.config"

export const signInReq = async (email: string, password: string) => {
  try {
    const res: any = await appAxios({
      method: 'post',
      url: '/api/auth/signin',
      data: {
        email: email,
        password: password,
      }
    })
    console.log(res)
    return res

    // const res: any = await axios.post(`${baseUrl}/api/auth/signin`, {
    //   email: email,
    //   password: password,
    // })
    // return res
  }
  catch (error: any) {
    console.log(error.response.data.message)
  }
}