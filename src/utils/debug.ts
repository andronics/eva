import pkg from '../../package.json'
import dbg, { Debugger } from 'debug'

export default (namespace: string) : Debugger => {
    return dbg(`${pkg.name}:${namespace}`)
}