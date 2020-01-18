///(page
import '../shared/action-card.js';
import DappLib from '../../../lib/dapp-lib';

export default class IpfsPage extends CustomElement {

    constructor(...args) {
        super([], ...args);
    }

    render() {
        let self = this;

        let content = 
`
    <section>
        <h5>${self.category}</h5>
        <h2 class="mb-5"><strong>${self.title}</strong></h2>
        <div class="row">
            <action-card 
                title="Add Document" 
                description="Upload document to IPFS and add hash to contract"
                action="addIpfsDocument"
                method="post"
                fields="file"            
                class="col-md-8 col-sm-12 mb-5"
                >
                <article>        
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" data-field="file">
                            <label class="custom-file-label">Choose file</label>
                        </div>
                    </div>
                </article>
            </action-card>        
        </div>
      </section>
`
        self.innerHTML = content;
        self.handleUpload();
    }


    handleUpload() {

        document.querySelector('input[data-field=file]').addEventListener('change', async (target) => {

        
            let domFiles = target.srcElement.files;
            let files = [];
            for (let f = 0; f < domFiles.length; f++) {
                files.push(domFiles[f]);
            }
            console.log('Files', files);
            let result = await DappLib.ipfsUpload(files,
                (bytes) => {
                    console.log(bytes);
                });
                
            let ipfs = DappLib.ipfsGateway();

            if (result.folder) {
                let fileResults = [];
                fileResults.push({
                    label: 'Folder',
                    value: `${ipfs.protocol}://${ipfs.host}/ipfs/${result.folder}`
                })
                result.files.map((file, index) => {
                    fileResults.push({
                        label: `File #${index}`,
                        value: `${file.path} – ${ipfs.protocol}://${ipfs.host}/ipfs/${file.hash}`
                    })
                });
                console.log('IPFS Upload Result', '', fileResults);

            } else {
                console.log('IPFS Upload Result', '', [{
                    label: 'URL',
                    value: 'Upload failed'
                }]);
            }
        });
    }
  
}


customElements.define('ipfs-page', IpfsPage);
///)