use std::collections::HashMap;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn find_shortest_path(origin: &JsValue, start: i32) -> JsValue {
    let graph_map: HashMap<i32, HashMap<i32, i32>> = origin.into_serde().unwrap();
    JsValue::from_serde(&find_shortest_path_all_inner(&graph_map, start)).unwrap()
}

pub fn find_shortest_path_all_inner(
    graph: &HashMap<i32, HashMap<i32, i32>>,
    start: i32
) -> HashMap<i32, (Vec<i32>, i32)> {
    let mut solutions = HashMap::new();
    solutions.insert(start, (Vec::new(), 0));

    loop {
        let mut parent = i32::MAX;
        let mut nearest = 0;
        let mut dist = i32::MAX;

        for (x, (_, xdist)) in solutions.iter() {
            let adj = graph.get(x).unwrap();
            for (y, weight) in adj.iter() {
                if solutions.contains_key(y) {
                    continue;
                }

                let d = weight + xdist;
                if d < dist {
                    dist = d;
                    parent = *x;
                    nearest = *y;
                }
            }
        }



        if dist == i32::MAX {
            break
        }

        let (mut vc, _) = solutions.get(&parent).unwrap().to_owned();
        vc.push(nearest);
        solutions.insert(nearest, (vc, dist));
    }
    solutions
}