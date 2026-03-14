"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNavigation = exports.buildNavigationGraph = exports.dijkstra = exports.calculateDistance = void 0;
class PriorityQueue {
    items = [];
    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.items.shift()?.element;
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};
exports.calculateDistance = calculateDistance;
const dijkstra = (nodes, edges, startNodeId, endNodeId) => {
    const distances = {};
    const previous = {};
    const queue = new PriorityQueue();
    nodes.forEach((node) => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
    });
    distances[startNodeId] = 0;
    queue.enqueue(startNodeId, 0);
    while (!queue.isEmpty()) {
        const currentId = queue.dequeue();
        if (!currentId)
            break;
        if (currentId === endNodeId) {
            const path = [];
            let current = endNodeId;
            while (current) {
                path.unshift(current);
                current = previous[current];
            }
            return { path, distance: distances[endNodeId] };
        }
        const currentEdges = edges.filter((e) => e.from === currentId);
        for (const edge of currentEdges) {
            const alt = distances[currentId] + edge.weight;
            if (alt < distances[edge.to]) {
                distances[edge.to] = alt;
                previous[edge.to] = currentId;
                queue.enqueue(edge.to, alt);
            }
        }
    }
    return null;
};
exports.dijkstra = dijkstra;
const buildNavigationGraph = (stores) => {
    const nodes = stores.map((store) => ({
        id: store.id,
        x: store.coordinateX,
        y: store.coordinateY,
        storeId: store.id,
    }));
    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = (0, exports.calculateDistance)(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            edges.push({ from: nodes[i].id, to: nodes[j].id, weight: distance });
            edges.push({ from: nodes[j].id, to: nodes[i].id, weight: distance });
        }
    }
    return { nodes, edges };
};
exports.buildNavigationGraph = buildNavigationGraph;
const calculateNavigation = (startX, startY, stores, targetStoreId) => {
    const startNode = {
        id: 'start',
        x: startX,
        y: startY,
    };
    const allNodes = [startNode, ...stores.map((s) => ({
            id: s.id,
            x: s.coordinateX,
            y: s.coordinateY,
            storeId: s.id,
        }))];
    const edges = [];
    for (let i = 0; i < allNodes.length; i++) {
        for (let j = i + 1; j < allNodes.length; j++) {
            const distance = (0, exports.calculateDistance)(allNodes[i].x, allNodes[i].y, allNodes[j].x, allNodes[j].y);
            edges.push({ from: allNodes[i].id, to: allNodes[j].id, weight: distance });
            edges.push({ from: allNodes[j].id, to: allNodes[i].id, weight: distance });
        }
    }
    const result = (0, exports.dijkstra)(allNodes, edges, 'start', targetStoreId);
    if (!result)
        return null;
    const steps = result.path.map((nodeId) => {
        const node = allNodes.find((n) => n.id === nodeId);
        return {
            x: node.x,
            y: node.y,
            instruction: node.storeId ? `Arrive at store` : 'Starting point',
        };
    });
    const avgWalkingSpeed = 1.4;
    const duration = Math.ceil(result.distance / avgWalkingSpeed);
    return {
        distance: Math.round(result.distance * 100) / 100,
        duration,
        steps,
    };
};
exports.calculateNavigation = calculateNavigation;
//# sourceMappingURL=navigation.js.map