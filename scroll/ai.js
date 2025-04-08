async function generateImageFromPrompt(prompt) {
  const apiUrl = "https://stablehorde.net/api/v2/generate/async";
  const apiKey = "3U1jy7S28BXB1Vdf2Y7lXw"; // Замените на ваш API ключ (если есть)
  
  const requestData = {
    prompt: prompt,
    params: {
      steps: 30,
      width: 512,
      height: 512,
      cfg_scale: 7.5,
      sampler_name: "k_euler_a",
      n: 1
    },
    nsfw: false,
    trusted_workers: false,
    slow_workers: true,
    censor_nsfw: false,
    models: ["stable_diffusion"],
    shared: true
  };

  try {
    // Шаг 1: Отправляем запрос на генерацию
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Client-Agent": "my-app/1.0", // Укажите ваш клиентский агент
        "apikey": apiKey // Опционально, если у вас есть API ключ
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const requestId = result.id;
    console.log("Generation started. Request ID:", requestId);

    // Шаг 2: Проверяем статус генерации
    const checkStatus = async () => {
      const statusUrl = `https://aihorde.net/api/v2/generate/check/${requestId}`;
      const statusResponse = await fetch(statusUrl, {
        headers: {
          "Client-Agent": "my-app/1.0"
        }
      });
      
      return await statusResponse.json();
    };

    // Шаг 3: Ждем завершения генерации
    let status;
    do {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Проверяем каждые 5 секунд
      status = await checkStatus();
      console.log(`Status: ${status.finished}/${status.waiting} done, ${status.processing} processing`);
    } while (!status.done);

    // Шаг 4: Получаем результат
    const resultUrl = `https://aihorde.net/api/v2/generate/status/${requestId}`;
    const finalResponse = await fetch(resultUrl, {
      headers: {
        "Client-Agent": "my-app/1.0"
      }
    });

    const finalResult = await finalResponse.json();
    
    if (finalResult.generations && finalResult.generations.length > 0) {
      const imageData = finalResult.generations[0].img;
      console.log("Image generated successfully!");
      return imageData; // Возвращаем base64 строку изображения
    } else {
      throw new Error("No generations returned");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

// Пример использования:
async function exampleUsage() {
  try {
    const prompt = "A beautiful sunset over mountains, digital art";
    const imageURL = await generateImageFromPrompt(prompt);
    
    // Отображаем изображение на странице
    const imgElement = document.createElement('img');
    imgElement.src = `${imageURL}`;
    document.body.appendChild(imgElement);
    
  } catch (error) {
    console.error("Failed to generate image:", error);
  }
}

// Запускаем пример
exampleUsage();