const Docker = require('dockerode');

// Docker 클라이언트 생성
const docker = new Docker();

// 실행 중인 컨테이너와 실행되지 않은 전체 컨테이너, 실행되지 않은 컨테이너 이름 배열을 가져오는 함수
async function getContainerNames() {
  try {
    // Docker API를 통해 실행 중인 컨테이너와 실행되지 않은 전체 컨테이너 목록을 가져옴
    const containers = await docker.listContainers({ all: true });

    // 실행 중인 컨테이너와 실행되지 않은 컨테이너를 구분하여 배열로 추출
    const runningContainers = [];
    const stoppedContainers = [];
    
    for (const container of containers) {
      const containerName = container.Names[0].replace(/^\//, '');
      if (container.State === 'running') {
        runningContainers.push(containerName);
      } else {
        stoppedContainers.push(containerName);
      }
    }

    return { runningContainers, stoppedContainers };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getContainerNames,
};