<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TipTap Editor</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
      <!-- This will include the necessary Vite assets -->
</head>
<body>
    <div id="root" data-title="{{$title}}"  data-content="{{$content}}"></div>
    <script>
        const noteId = @json($noteId);
        const title = @json($title);
        const content = @json($content);
    </script>

</body>
</html>
