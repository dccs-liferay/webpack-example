package at.dccs.liferay.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.servlet.taglib.BaseDynamicInclude;
import com.liferay.portal.kernel.servlet.taglib.DynamicInclude;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, service = DynamicInclude.class)
public class JSBottomInclude extends BaseDynamicInclude {

  @Override
  public void include(
      HttpServletRequest request, HttpServletResponse response,
      String key)
    throws IOException {

    PrintWriter printWriter = response.getWriter();
    printWriter.print(INCLUDE_TEXT);
  }

  @Override
  public void register(DynamicIncludeRegistry dynamicIncludeRegistry) {
    dynamicIncludeRegistry.register("/html/common/themes/bottom.jsp#post");
  }

  /**
   * Try to find a reference for filename in the manifest and return it's corresponding hashed filename and return
   * the url to the hashed file. If no entry is found in the manifest the original filename is returned.
   *
   * @param filename The name of the asset file.
   * @return String
   */
  public static String asset(Map<String, String> manifest, String filename) {
      if (manifest != null && manifest.containsKey(filename)) {
          return manifest.get(filename);
      }

      LOGGER.error("Could not find asset file `" + filename + "` in mix-manifest.json!");
      throw new NoSuchElementException("Asset " + filename + " missing, invalid configuration");
  }

  /**
   * Activator.
   * Call the method which reads the manifest file.
   *
   * @throws IOException when manifest file could not be found/read.
   */
  @Activate
  private void loadManifest() throws IOException {
      Map<String, String> manifest = getManifest();
      INCLUDE_TEXT = 
      "<link href=' " + asset(manifest, "app.css") + "' rel='stylesheet' />"
      + "<script src='" + asset(manifest, "runtime.js") + "'></script>"
      + "<script src='" + asset(manifest, "vendor.js") + "'></script>"
      + "<script src='" + asset(manifest, "app.js") + "'></script>";
  }

  /**
   * Read the manifest file if possible and save it to a member variable.
   *
   * @throws IOException when manifest file could not be found/read.
   */
  private Map<String, String> getManifest() throws IOException {
      ClassLoader classloader = Thread.currentThread().getContextClassLoader();
      InputStream stream = classloader.getResourceAsStream(MANIFEST_PATH);
      return new ObjectMapper().readValue(stream, HashMap.class);
  }
  
  private final static String MANIFEST_PATH = "META-INF/resources/assets/manifest.json";
  private static String INCLUDE_TEXT = "";
  private final static Log LOGGER = LogFactoryUtil.getLog(JSBottomInclude.class);
}