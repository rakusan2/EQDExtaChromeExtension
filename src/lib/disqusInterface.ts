
interface dsqMesg {
    scope: "host",
    sender: string
}
interface dsqReady extends dsqMesg {
    data: any[],
    name: "ready"
}
interface dsqResize extends dsqMesg {
    data: {
        height: number
    }
    name: "resize"
}
interface dsqPostCount extends dsqMesg {
    data: number,
    name: "posts.count"
}
interface dsqRendered extends dsqMesg {
    data: {
        height: number
    }
    name: "rendered"
}
interface dsqSessionIdentity extends dsqMesg {
    data: any[] | string,
    name: "session.identity"
}
interface dsqFakeScroll extends dsqMesg {
    data: any[],
    name: "fakeScroll"
}
interface dsqHomePreload extends dsqMesg {
    data: {},
    name: "home.preload"
}
export type dsq = dsqReady | dsqResize | dsqPostCount | dsqRendered | dsqSessionIdentity | dsqFakeScroll | dsqHomePreload;
