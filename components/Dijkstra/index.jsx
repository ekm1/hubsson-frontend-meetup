import React, { useEffect, useRef, useState } from 'react'
import * as wasm from 'wasm-lib'
import { generateGraph, findShortestPath } from './dijkstra'

function Dijkstra() {
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState(200)
  const [type, setType] = useState(1)
  const canvasRef = useRef()

  const performanceRef = useRef({})
  const [perf, setPerf] = useState({})

  useEffect(() => {
    // wasm.greet()
  }, [])

  const start = async () => {
    setLoading(true)
    let graph = generateGraph(size)
    const runner = []
    if (type === 1) {
      runner.push(execWasm(graph))
    } else {
      runner.push(execJs(graph))
    }

    Promise.all(runner)
      .then((res) => {
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const reset = () => {
    setPerf({})
    drawCanvas(canvasRef.current.getContext('2d'), {}, size)
  }

  function execJs(graph) {
    performanceRef.current = {
      wasm: 0,
      js: 0,
    }
    return new Promise((resolve) => {
      let start = performance.now()
      let res = findShortestPath(graph, 0)
      performanceRef.current.js += performance.now() - start
      drawCanvas(canvasRef.current.getContext('2d'), res, size)
      resolve(res)
    })
  }

  function execWasm(graph) {
    performanceRef.current = {
      wasm: 0,
      js: 0,
    }
    return new Promise((resolve) => {
      let start = performance.now()
      let res = wasm.find_shortest_path(graph, 0)
      performanceRef.current.wasm += performance.now() - start
      drawCanvas(canvasRef.current.getContext('2d'), res, size)
      resolve(res)
    })
  }

  useEffect(() => {
    setPerf(performanceRef.current)
  }, [loading])

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-grow flex-col">
        <div className="flex-grow">
          <div className="bg-white">
            <div className="px-12">
              <div className="flex justify-center py-6">
                <div>
                  <div className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-700">
                    <div className="inline-flex rounded-full border-2 border-gray-200 bg-gray-200 text-sm leading-none text-gray-500">
                      <button
                        onClick={(e) => setType(1)}
                        className={`${
                          type === 1 && 'toggle-active'
                        } inline-flex items-center rounded-full rounded-l-full px-4 py-2 transition-colors duration-300 ease-in hover:text-gray-600 focus:text-gray-600 focus:outline-none`}
                        id="grid"
                      >
                        <span>WebAssembly</span>
                      </button>
                      <button
                        onClick={(e) => setType(2)}
                        className={`${
                          type === 2 && 'toggle-active'
                        } inline-flex items-center rounded-full rounded-r-full px-4 py-2 transition-colors duration-300 ease-in hover:text-gray-600 focus:text-gray-600 focus:outline-none`}
                        id="list"
                      >
                        <span>Javascript</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-12 py-8">
            <div className="flex items-center justify-center">
              <div className="m-3">
                <div className="flex">
                  <span className="whitespace-no-wrap rounded-l border border-2 bg-gray-300 px-4 py-2 text-sm">
                    Size:
                  </span>
                  <input
                    name="field_name"
                    onChange={(e) => {
                      let val = Number(e.currentTarget.value)
                      if (isNaN(val)) {
                        return
                      }
                      setSize(val)
                    }}
                    value={size}
                    className="rounded-r border border-2 px-4 py-2"
                    type="text"
                  />
                </div>
              </div>
              <div className="m-3">
                <button
                  disabled={loading}
                  onClick={start}
                  className="inline-flex items-center rounded border-b-2 border-green-500 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white"
                >
                  <span className="mr-2">Start</span>
                </button>
              </div>

              <div className="m-3">
                <button
                  onClick={reset}
                  className="inline-flex items-center rounded border-b-2 border-yellow-500 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-yellow-600 hover:bg-yellow-500 hover:text-white"
                >
                  <span className="mr-2">Reset</span>
                </button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              {((perf && perf.wasm) || perf.js) && (
                <div className="absolute inline-flex items-center rounded border-b-2 border-blue-500 bg-white py-2 px-6 font-bold text-gray-800 shadow-md">
                  {Math.round(perf.wasm || perf.js)} ms
                </div>
              )}
              <canvas
                className="rounded-md border border-gray-300 bg-gray-300 shadow-xl"
                ref={canvasRef}
                height="800"
                width="800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dijkstra

function drawCanvas(context, solutions, size) {
  let boxSize = 800
  let sizeRatio = boxSize / size
  context.clearRect(0, 0, boxSize, boxSize)
  context.fillStyle = '#14bca6'

  console.error(solutions)

  Object.entries(solutions).forEach(([x, [list]]) => {
    let len = list.length - 1
    const lastEl = list[len]
    context.fillRect(
      Number(x) * sizeRatio,
      Number(lastEl) * sizeRatio,
      (sizeRatio * size) / 200,
      (sizeRatio * size) / 200
    )
  })
}
