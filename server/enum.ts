
export enum HostTypeA {
    ETHEREAL = 'ethereal',
    SENDMAIL = 'sendmail'
}
export enum HostType {
    ETHEREAL ,
    SENDMAIL
}

let hostType : HostType = HostType['SENDMAIL']
let key = 'SENDMAIL'
let hostTypse : HostType = HostType[key  as keyof typeof HostType]
console.log(hostTypse === HostType.SENDMAIL)
key = 'sendmail'
hostTypse = HostType[key.toUpperCase()  as keyof typeof HostType]
console.log(hostTypse === HostType.SENDMAIL)
