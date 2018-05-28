import sample from './sample';

const CLASENAME = 'timestamp_image';
export default class Index {
    constructor(imageDom) {
        this.imageDom = imageDom;
        this.src = this.imageDom.src;
        this.setEvent();
    }

    setEvent() {
        //this.src = this.assetTimestamp(this.src);
        this.src = 'http://sp.black.local.qw.to//img/uplcmn/2018/0320/my_ex_20180323_top.jpg?1213214133241';
    }

    /**
     * image file exist or not
     *
     * @param string src: source path of image file
     * @return boolean returns false if image file not exist, otherwise return true
     * */
    isExist(src) {
        let existFlag = false;
        let imageObj = new Image();
        imageObj.src = src;

        // @TODO how to judge a image exist or not in server
        if (imageObj.fileSize >= 0 || (imageObj.width >= 0 && imageObj.height >= 0)) {
            existFlag = true;
        }
        return existFlag;
    }

    /**
     * get timestamp of image based on the last modified of image file
     *
     * @param string source path of image file
     * @return Date timestamp of image path
     * */
    assetTimestamp(src) {
        // @TODO async await get the result
        let lastModifiedTime = this.getLastModified(src);

        // cannot get image information ,like in bad internet environment
        if (!lastModifiedTime) {
            return;
        }

        let lastModifiedTimeDate = new Date(lastModifiedTime);
        return lastModifiedTimeDate.getTime();
    }

    /**
     * get last modified time of image file
     *
     * @param string source path of image file
     * @return string last modified time of image file if image is exist in server
     * */
    getLastModified(src) {
        let lastModifiedTime = '';
        let xmlRequestObj = new XMLHttpRequest();

        // head method, async
        xmlRequestObj.open('head', src, true);

        // http request send
        xmlRequestObj.send();

        // if status change to 4 will get response
        xmlRequestObj.onreadystatechange = () => {
            if (xmlRequestObj.readyState === 4) {
                lastModifiedTime = xmlRequestObj.getResponseHeader('Last-Modified');
                return lastModifiedTime;
            }
        };
    }
}
