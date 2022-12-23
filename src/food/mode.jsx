const mode = "DEVELOPER"
// const mode = "PRODUCT"

const BaseUrl = (relativepath) => {
    const baseDomain = {
        "DEVELOPER":"http://192.168.1.77:7000/",
        "PRODUCT":""
    }

    return(new URL(relativepath,baseDomain[mode]).toString())
}
export default BaseUrl