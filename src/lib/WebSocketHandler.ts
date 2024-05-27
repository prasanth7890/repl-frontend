export class WebSocketHandler {
    // must specify all the events here.
    // gives a function to send an event
    // retuns the data from backend.
    // ahould initializes a ws connection to backend. 
    // it should be singleton
    // when the whole app renders (not a single component) then this socket has to be closed

    private static instance: WebSocketHandler | null;
    private socket: WebSocket | null = null;
    public whenLoaded: Function = ()=>{};
    public whenFileClick: Function = ()=>{};
    public whenFolderClick: Function = ()=> {};
    

    constructor(boxId: string) {
        this.socket = new WebSocket(`ws://localhost:3000/connect?boxId=${boxId}`);
        console.log(`connected to ${boxId}`);
    }

    private handleFileEvent(data: any, fileName: string, filePath: string) {
        this.whenFileClick(data, fileName, filePath);
    }

    private handleFolderEvent(path: string, data: any) {
        this.whenFolderClick(path, data);
    }

    private handleLoadedEvent(data: any) {
        this.whenLoaded(data);
    }

    public addEventListeners(): void {
        if(this.socket) {
            this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                
                switch (message.event) {
                    case 'file':
                        this.handleFileEvent(message.data, message.name, message.path);
                        break;
                    case 'folder':
                        this.handleFolderEvent(message.path, message.data);
                        break;
                    case 'loaded':
                        this.handleLoadedEvent(message.data);
                        break;
                    default: 
                        break;        
                }
            }   
        }
    }

    public static getInstance(boxId: string): WebSocketHandler {
        if(!WebSocketHandler.instance) {
            WebSocketHandler.instance = new WebSocketHandler(boxId);
        }  

        return WebSocketHandler.instance;
    }

    public clearInstance() {
        if(!WebSocketHandler.instance) {
            WebSocketHandler.instance = null;
        }
    }

    public getSocket() {
        if(this.socket !== null) {
            return this.socket;
        }
    }

    public closeSocket() {
        if(this.socket) {
            this.socket?.close();
            console.log('closing socket');
        }
    }
}
