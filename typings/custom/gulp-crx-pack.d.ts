declare module "gulp-crx-pack"{
    function gcp(options:gcp.options):NodeJS.ReadWriteStream;
    namespace gcp{
        interface options{
            privateKey:string,
            filename:string,
            codebase?:string,
            updateXmlFilename?:string
        }
    }
    export = gcp
}