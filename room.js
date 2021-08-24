const socket = io('/')
const newstream = document.getElementById('stream')
const newvideo = document.createElement('video')
const newpeer = new Peer(undefined,{
    host: '/',
    port: '3001'
})
newpeer.on('open', id=>{
    socket.emit('join-room',ROOM_ID, id)
})
newvideo.muted = true;
const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    streamvideo(newvideo,stream)
    newpeer.on('call', call=>{
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userStream =>{
            streamvideo(video, userstream)
        })
    })
    socket.on('user-connected',(userId)=>{
        connectNewUser(userId,stream)
    })
})

socket.on('user-connected', userId=>{
console.log("user-connected:"+userId)
})
socket.on('user-disconnected', userId=>{
    if(peers[userId])
    peers[userId].close()
    })
function streamvideo(video,stream)
{
    video.srcObject = stream
    video.addEventListener('loadedmetadata',()=>{
    video.play()
    })
    newstream.append(video)
}
function connectNewUser(userId,stream)
{

    const call = newpeer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream', userStream =>{
        streamvideo(video, userstream)
    })
    call.on('close', ()=>{
        video.remove()
    })
    peers[userId] = call
}