import { getClusterIdFromHost } from "../cluster-id-url-parsing";

describe("getClusterIdFromHost", () => {
  const clusterFakeId = "fe540901-0bd6-4f6c-b472-bce1559d7c4a";

  it("should return undefined for non cluster frame hosts", () => {
    expect(getClusterIdFromHost("renderer.k8sight.app:45345")).toBeUndefined();
  });

  it("should return ClusterId for cluster frame hosts", () => {
    expect(getClusterIdFromHost(`${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(clusterFakeId);
  });

  it("should return ClusterId for cluster frame hosts with additional subdomains", () => {
    expect(getClusterIdFromHost(`abc.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(clusterFakeId);
    expect(getClusterIdFromHost(`abc.def.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(clusterFakeId);
    expect(getClusterIdFromHost(`abc.def.ghi.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(clusterFakeId);
    expect(getClusterIdFromHost(`abc.def.ghi.jkl.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(clusterFakeId);
    expect(getClusterIdFromHost(`abc.def.ghi.jkl.mno.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(clusterFakeId);
    expect(getClusterIdFromHost(`abc.def.ghi.jkl.mno.pqr.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(
      clusterFakeId,
    );
    expect(getClusterIdFromHost(`abc.def.ghi.jkl.mno.pqr.stu.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(
      clusterFakeId,
    );
    expect(getClusterIdFromHost(`abc.def.ghi.jkl.mno.pqr.stu.vwx.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(
      clusterFakeId,
    );
    expect(getClusterIdFromHost(`abc.def.ghi.jkl.mno.pqr.stu.vwx.yz.${clusterFakeId}.renderer.k8sight.app:59110`)).toBe(
      clusterFakeId,
    );
  });
});
