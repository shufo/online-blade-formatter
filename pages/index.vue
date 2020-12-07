<template>
  <div class="container">
    <div class="container mx-auto px-4">
      <nav class="flex flex-wrap items-center justify-between p-4">
        <div class="lg:order-1 w-auto lg:w-1/5">
          <a class="text-xl font-semibold font-heading" href="#"
            >Online Blade Formatter</a
          >
        </div>
        <div
          class="navbar-menu hidden lg:order-3 lg:block w-full lg:w-2/5 lg:text-right"
        >
          <a
            href="https://github.com/shufo/online-blade-formatter"
            target="_blank"
          >
            <component
              :is="`git-hub-icon-${colorMode}`"
              class="items-center cursor-pointer block lg:inline-block mt-4 lg:mt-0 mr-10 w-6 h-6"
            />
          </a>
          <!-- Toggle Button -->
          <label
            for="toogleA"
            class="items-center cursor-pointer block lg:inline-block mt-4 lg:mt-0 mr-10"
          >
            <!-- toggle -->
            <div class="relative">
              <!-- input -->
              <input
                v-model="$colorMode.preference"
                id="toogleA"
                type="checkbox"
                class="hidden"
                :checked="$colorMode.preference === 'dark'"
                true-value="dark"
                false-value="light"
              />
              <!-- line -->
              <div
                class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
              ></div>
              <!-- dot -->
              <div
                class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            </div>
            <!-- label -->
          </label>
        </div>
      </nav>

      <div class="flex flex-wrap -mx-4 -mb-4 md:mb-0">
        <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <div class="mb-6">
            <label class="block text-sm font-bold mb-2" for="">Input</label>
            <prism-editor
              v-model="content"
              class="editor appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              :highlight="highlighter"
              @input="$fetch"
            ></prism-editor>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <div class="mb-6">
            <label class="block text-sm font-bold mb-2" for="">Formatted</label>
            <prism-editor
              v-model="formatted"
              class="editor appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-50 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              read-only
              :highlight="highlighter"
            />
          </div>
          <pre v-html="error"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/themes/prism-tomorrow.css'
import AnsiUp from 'ansi_up'
import GitHubIconLight from '@/assets/svg/github-icon-light.svg?inline'
import GitHubIconDark from '@/assets/svg/github-icon-dark.svg?inline'
export default {
  components: { PrismEditor, GitHubIconLight, GitHubIconDark },
  data() {
    return {
      formatted: '',
      content: `@extends('frontend.layouts.app')
@section('title') foo
@endsection
@section('content')
<section id="content">
<div class="container mod-users-pd-h">
    <div class="pf-user-header">
    <div></div>
    <p>@lang('users.index')</p>
    </div>
        <div class="pf-users-branch">
            <ul class="pf-users-branch__list">
                @foreach($users as $user)
        <li>
            <img src="{{ asset('img/frontend/icon/branch-arrow.svg') }}" alt="branch_arrow">
            {{ link_to_route("frontend.users.user.show",$users["name"],$users['_id']) }}
        </li>
        @endforeach
      </ul>
      <div class="pf-users-branch__btn">
      @can('create', App\\Models\\User::class)
            {!! link_to_route("frontend.users.user.create",__('users.create'),[1,2,3],['class' => 'btn']) !!}
            @endcan
        </div>
  </div>
    </div>
</section>
@endsection
@section('footer')
@stop
      `,
      error: '',
    }
  },
  mounted() {
    console.log(this.$colorMode)
    console.log(this.$colorMode.value)
    console.log(this.$colorMode.preference)
  },
  async fetch() {
    if (this.content === '') {
      return
    }

    const res = await this.$http.post('/v1/format', {
      content: this.content,
    })

    const body = await res.json()

    if (body.error) {
      const ansi = new AnsiUp()
      return (this.error = ansi.ansi_to_html(body.error))
    }

    this.error = ''
    this.formatted = body.formatted
  },
  methods: {
    refresh() {
      this.$fetch()
    },
    highlighter(code) {
      return highlight(code, languages.php) // languages.<insert language> to return html with markup
    },
  },
  watch: {},
  computed: {
    colorMode() {
      // console.log(this.$colorMode.value)
      // console.log(this.$colorMode.preference)
      if (this.$colorMode.value === 'system') {
        return 'dark'
      }
      if (this.$colorMode.preference === 'system') {
        return this.$colorMode.value
      }

      return this.$colorMode.preference
    },
  },
}
</script>

<style>
/* required class */
.editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}

.toggle__dot {
  top: -0.25rem;
  left: -0.25rem;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(100%);
  background-color: #48bb78;
}
</style>
