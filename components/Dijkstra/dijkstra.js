export function generateGraph(n) {
  let graph = {}

  for (let i = 0; i < n; i++) {
    let adj = {}
    for (let j = 0; j < n; j++) {
      if (j !== i && Math.random() < 0.6) {
        if (!graph[j] || !graph[j][i]) {
          adj[j] = ((Math.random() * 100) | 0) + 1
        }
      }
    }

    graph[i] = adj
  }

  return graph
}

export function findShortestPath(graph, s) {
  const solutions = {}
  solutions[s] = [[], 0]

  while (true) {
    let parent = null
    let nearest = null
    let dist = Infinity

    //for each existing solution
    for (const n in solutions) {
      if (!solutions[n]) {
        continue
      }
      const ndist = solutions[n][1]
      const adj = graph[n]
      for (const a in adj) {
        if (solutions[a]) {
          continue
        }
        const d = adj[a] + ndist
        if (d < dist) {
          parent = solutions[n][0]
          nearest = Number(a)
          dist = d
        }
      }
    }

    //no more solutions
    if (dist === Infinity) {
      break
    }

    solutions[nearest] = [parent.concat(nearest), dist]
  }
  return solutions
}
